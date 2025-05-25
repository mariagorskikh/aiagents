import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

const WAITLIST_FILE = path.join(process.cwd(), 'data', 'waitlist.json');

// Database connection (only in production)
let db: any = null;

async function getDbConnection() {
  if (process.env.DATABASE_URL && !db) {
    try {
      const { Client } = require('pg');
      db = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
      });
      await db.connect();
      
      // Create table if it doesn't exist with correct column names
      await db.query(`
        CREATE TABLE IF NOT EXISTS waitlist (
          id SERIAL PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      
      console.log('Database connected and table created');
    } catch (error) {
      console.error('Database connection failed:', error);
      db = null;
    }
  }
  return db;
}

// Ensure data directory exists (for localhost)
function ensureDataDirectory() {
  const dataDir = path.dirname(WAITLIST_FILE);
  try {
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
      console.log('Created data directory:', dataDir);
    }
  } catch (error) {
    console.error('Error creating data directory:', error);
    throw new Error('Could not create data directory');
  }
}

// Read existing waitlist from file (localhost)
function readWaitlist() {
  try {
    ensureDataDirectory();
    
    if (fs.existsSync(WAITLIST_FILE)) {
      const data = fs.readFileSync(WAITLIST_FILE, 'utf8');
      if (data.trim()) {
        return JSON.parse(data);
      }
    }
    
    return [];
  } catch (error) {
    console.error('Error reading waitlist file:', error);
    return [];
  }
}

// Write waitlist to file (localhost)
function writeWaitlist(waitlist: any[]) {
  try {
    ensureDataDirectory();
    fs.writeFileSync(WAITLIST_FILE, JSON.stringify(waitlist, null, 2), 'utf8');
    console.log('Successfully wrote waitlist with', waitlist.length, 'entries to file');
  } catch (error) {
    console.error('Error writing waitlist file:', error);
    throw new Error('Could not save waitlist data');
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('Received waitlist signup request');
    
    const body = await request.json();
    const { email } = body;
    
    console.log('Processing email:', email);

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Try database first (production), fallback to file (localhost)
    const dbConnection = await getDbConnection();
    
    if (dbConnection) {
      console.log('Using database storage');
      
      try {
        // Check if email already exists
        const existingResult = await dbConnection.query(
          'SELECT id FROM waitlist WHERE email = $1',
          [email]
        );
        
        if (existingResult.rows.length > 0) {
          return NextResponse.json(
            { error: 'This email is already on the waitlist' },
            { status: 409 }
          );
        }
        
        // Insert new email
        const result = await dbConnection.query(
          'INSERT INTO waitlist (email) VALUES ($1) RETURNING id, created_at',
          [email]
        );
        
        const newEntry = result.rows[0];
        console.log('Successfully added email to database:', email);
        
        return NextResponse.json(
          { 
            message: 'Successfully added to waitlist',
            id: newEntry.id.toString(),
            storage: 'database'
          },
          { status: 201 }
        );
        
      } catch (dbError) {
        console.error('Database error:', dbError);
        // Fall back to file storage
      }
    }
    
    // File storage (localhost or database fallback)
    console.log('Using file storage');
    
    const waitlist = readWaitlist();
    console.log('Current waitlist has', waitlist.length, 'entries');

    // Check if email already exists
    const existingEntry = waitlist.find((entry: any) => entry.email === email);
    if (existingEntry) {
      console.log('Email already exists in waitlist:', email);
      return NextResponse.json(
        { error: 'This email is already on the waitlist' },
        { status: 409 }
      );
    }

    // Add new entry
    const newEntry = {
      email,
      timestamp: new Date().toISOString(),
      id: Date.now().toString()
    };

    waitlist.push(newEntry);
    console.log('Adding new entry:', newEntry);

    // Save to file
    writeWaitlist(waitlist);
    console.log('Successfully added email to waitlist:', email);

    return NextResponse.json(
      { 
        message: 'Successfully added to waitlist',
        id: newEntry.id,
        storage: 'file'
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Unexpected error in waitlist API:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    console.log('Received waitlist GET request');
    
    // Try database first
    const dbConnection = await getDbConnection();
    
    if (dbConnection) {
      try {
        const result = await dbConnection.query(
          'SELECT COUNT(*) as count FROM waitlist'
        );
        
        const entriesResult = await dbConnection.query(
          'SELECT id, email, created_at FROM waitlist ORDER BY created_at DESC'
        );
        
        return NextResponse.json({
          count: parseInt(result.rows[0].count),
          entries: entriesResult.rows,
          storage: 'database'
        });
      } catch (dbError) {
        console.error('Database error in GET:', dbError);
      }
    }
    
    // File storage fallback
    const waitlist = readWaitlist();
    console.log('Current waitlist data has', waitlist.length, 'entries');
    
    return NextResponse.json({
      count: waitlist.length,
      entries: waitlist.map((entry: any) => ({
        id: entry.id,
        timestamp: entry.timestamp
      })),
      storage: 'file'
    });
  } catch (error) {
    console.error('Error retrieving waitlist:', error);
    return NextResponse.json(
      { error: 'Could not retrieve waitlist data' },
      { status: 500 }
    );
  }
} 