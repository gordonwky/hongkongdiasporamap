// app/api/ping/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
// Update the import path if the Story model is located elsewhere, for example:
import Story from "@/models/Story";
// Or use the correct relative path based on your project structure

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();
    const { story, lat, lng } = body;

    if (!story || typeof story !== "string") {
      return NextResponse.json({ error: "Story is required" }, { status: 400 });
    }
    // print the story to the console for debugging
    console.log("Received story:", story);
    const newStory = await Story.create({ story ,lat, lng });

    return NextResponse.json({
      message: "Story saved",
      data: {
        id: newStory._id,
        story: newStory.story,
        createdAt: newStory.createdAt,
      },
    });
  } catch (error) {
    console.error("Error saving story:", error);
    return NextResponse.json({ error: "Failed to save story" }, { status: 500 });
  }
}

export async function GET(){
  try{
    await dbConnect();
    const stories = await Story.aggregate([
      { 
        $sort :{createdAt : -1},
      },
      {
          $group:{
          _id:  { lat: "$lat", lng: "$lng" },
          story:{$first : "$story"},
          lat: { $first: "$lat" },
          lng: { $first: "$lng" },
          createdAt: { $first: "$createdAt" },
          _id_doc: { $first: "$_id" }
        }
      }
    ])
    return NextResponse.json(stories);
  }
catch(error){
    console.error("Error fetching stories:", error);
    return NextResponse.json({ error: "Failed to fetch stories" }, { status: 500 });
}
}