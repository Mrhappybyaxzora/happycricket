import { NextResponse } from 'next/server';
import { registerUser } from '@/lib/local-auth';

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();
    
    // Validate inputs
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Please provide all required fields' },
        { status: 400 }
      );
    }
    
    try {
      // Register user with local auth utility function
      const user = await registerUser({ name, email, password });
      
      // Return success
      return NextResponse.json(
        { 
          success: true, 
          user
        },
        { status: 201 }
      );
    } catch (error) {
      // Handle specific errors
      if (error.message === "User with this email already exists") {
        return NextResponse.json(
          { error: error.message },
          { status: 409 }
        );
      }
      
      throw error; // Re-throw for generic error handling
    }
    
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  }
} 