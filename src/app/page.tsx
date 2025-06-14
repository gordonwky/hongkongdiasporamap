// pages/index.tsx
"use client";
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { HiMenu } from "react-icons/hi";
import { Button, ButtonGroup, Popover, PopoverTrigger, PopoverContent, Card, CardBody } from "@heroui/react";
const DynamicMap = dynamic(() => import('../components/Map'), { ssr: false });

export default function Home() {
  const [activeTab, setActiveTab] = useState<'intro' | 'history'>('intro');

  return (
    <main style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <DynamicMap />

      <>
        {/* Top-left container */}
        <div
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
            zIndex: 10,
            padding: '10px',
            borderRadius: '8px',
            // backgroundColor: 'rgba(255,255,255,0.8)', // optional
          }}
        >
          <h2 style={{ margin: 0 }}>Hong Kong Diaspora Map</h2>
        </div>

        {/* Top-right container */}
        <div
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            zIndex: 10,
            padding: '10px',
            borderRadius: '8px',
            // backgroundColor: 'rgba(255,255,255,0.8)', // optional
          }}
        >
          <Popover showArrow offset={20} placement="bottom">
            <PopoverTrigger>
              <Button radius="full"
                className="w-[168px] h-[48px] rounded-full bg-white border border-gray-300 hover:bg-gray-100 active:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 text-gray-800 font-light
                    text-[32px] flex items-center justify-center gap-4 shadow-md cursor-pointer"
                disableRipple={true}
                startContent={<HiMenu className="text-[32px]" />}
              >MENU</Button>
            </PopoverTrigger>
            <PopoverContent>
              <Card
                isBlurred
                radius="lg"
                shadow="lg"
                className="rounded-[24px] border border-black bg-background/60 dark:bg-default-100/50 w-[780px] h-[580px] p-4"
              >
                <CardBody>
                  <div className="grid grid-cols-12 gap-6 md:gap-4 items-start">
                    {/* Left Side Buttons */}
                    <div className="col-span-4">
                      <ButtonGroup className="flex flex-col gap-4">
                        <Button
                          variant={activeTab === 'intro' ? 'solid' : 'ghost'}
                          disableRipple
                          className="w-full text-[24px] p-2 cursor-pointer"
                          onPress={() => setActiveTab('intro')}
                        >
                          Introduction
                        </Button>
                        <Button
                          variant={activeTab === 'history' ? 'solid' : 'ghost'}
                          disableRipple
                          className="w-full text-[24px] p-2 cursor-pointer"
                          onPress={() => setActiveTab('history')}
                        >
                          History
                        </Button>
                      </ButtonGroup>
                    </div>

                    {/* Right Side Content */}
                    <div className="col-span-8">
                      {activeTab === 'intro' && (
                        <div>
                          <h2 className="text-2xl font-bold mb-4">Introduction</h2>
                          <p className="text-md text-default-600">
                            The Hong Kong Diaspora Map is an interactive project designed to tell the stories of Hongkongers who have migrated to different parts of the world...
                          </p>
                        </div>
                      )}

                      {activeTab === 'history' && (
                        <div>
                          <h2 className="text-2xl font-bold mb-4">History</h2>
                          <p className="text-md text-default-600">
                            Throughout history, waves of Hong Kong emigration have occurred due to political transitions, economic pressures, and personal freedoms, notably in the 1980s before the 1997 handover and again post-2019...
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardBody>
              </Card>
            </PopoverContent>
          </Popover>

        </div>
      </>



    </main>
  );
}
