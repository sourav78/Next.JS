"use client"
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import AutoPlay from "embla-carousel-autoplay";
import messages from "@/messages.json";

const Home = () => {
  return (
    <>
      <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12 bg-gray-800 text-white">
        <section className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold">
            Dive into the World of Anonymous Feedback
          </h1>
          <p className="mt-3 md:mt-4 text-base md:text-lg">
            True Feedback - Where your identity remains a secret.
          </p>
        </section>
      <Carousel 
        plugins={[AutoPlay({delay: 2000})]}
      className="w-full max-w-xl h-60">
        
        <CarouselContent className="h-60">
          {
            messages.map((message, index) => (
              <CarouselItem className="h-60" key={index}>
              <div className="p-1">
                <Card className="h-56 bg-gray-100">
                  <CardHeader>
                    {message.title}
                  </CardHeader>
                  <CardContent className="">
                    <span className="text-xl font-semibold">{message.content}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
            ))
          }
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      </main>
      <footer className="text-center p-4 md:p-6 bg-gray-900 text-white">
        © 2023 True Feedback. All rights reserved.
      </footer>
    </>
  );
};

export default Home;
