import { Button, Card, CardBody, CardHeader, Textarea } from "@heroui/react";
import { useState } from "react";
type MemoryCardProps = {
    lat: number,
    lng: number,
}
const MemoryCard = ({ lat, lng }: MemoryCardProps) => {
    const [story, setStory] = useState<string>("");
    return (
        <Card
            isBlurred
            radius="lg"
            shadow="lg"
            className="rounded-[24px] border border-black  dark:bg-default-100/50 w-[380px] h-[450px] p-4"
        >
            <CardHeader className="flex items-center justify-center bg-transparent">
                <h2 className="text-2xl font-bold">share this memory</h2>
            </CardHeader>
            <CardBody className="flex flex-col items-center">
                <div className="text-md text-default-600 mb-4 bg-transparent flex flex-col items-center">
                    <p className="mb-2">click on where your memory live</p>
                    <p className="mb-2">then, tell us your story</p>
                    <Textarea
                        className="bg-white w-[340px] h-[240px] rounded-lg mb-4 p-1 
                        !ring-0 !ring-offset-0 focus:outline-none focus:ring-0 
                        !shadow-none focus:!shadow-none"
                        variant="faded"
                        placeholder="here us your story ... "
                        value={story}
                        onChange={(e) => setStory(e.target.value)}
                    />
                    <Button type="submit" variant="bordered"
                        disableRipple className="bg-white text-black rounded-lg cursor-pointer"
                        onPress={async () => {
                            if (story.trim() === '') {
                                alert('Please enter a story before submitting.');
                                return;
                            }
                            alert('Thank you for sharing your memory!');
                            // send a form to the server or handle the story submission here
                            await fetch("/api/saveStory", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({ story, lat, lng }),
                            });

                            console.log('Story submitted:', story);

                            setStory(''); // Clear the story after submission
                        }
                        }
                    >
                        Submit
                    </Button>
                </div>
            </CardBody>
        </Card>
    );
}
export default MemoryCard;