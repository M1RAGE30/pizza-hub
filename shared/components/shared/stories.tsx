"use client";

import { Api } from "@/shared/services/api-client";
import { IStory } from "@/shared/services/stories";
import React from "react";
import { Container } from "./container";
import { cn } from "@/shared/lib/utils";
import { X } from "lucide-react";
import ReactStories from "react-insta-stories";

interface Props {
  className?: string;
}

export const Stories: React.FC<Props> = ({ className }) => {
  const [stories, setStories] = React.useState<IStory[]>([]);
  const [open, setOpen] = React.useState(false);
  const [selectedStory, setSelectedStory] = React.useState<IStory>();

  React.useEffect(() => {
    async function fetchStories() {
      const data = await Api.stories.getAll();
      setStories(data);
    }

    fetchStories();
  }, []);

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  const onClickStory = (story: IStory) => {
    setSelectedStory(story);

    if (story.items.length > 0) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedStory(undefined);
  };

  return (
    <>
      <Container
        className={cn(
          "flex items-center justify-between gap-2 my-10",
          className
        )}
      >
        {stories.length === 0 &&
          [...Array(6)].map((_, index) => (
            <div
              key={index}
              className="w-[200px] h-[250px] bg-gray-200 rounded-md animate-pulse"
            />
          ))}

        {stories.map((story) => (
          <img
            key={story.id}
            onClick={() => onClickStory(story)}
            className="rounded-md cursor-pointer transition-transform hover:scale-105"
            height={250}
            width={200}
            src={story.previewImageUrl}
            alt={`Story ${story.id}`}
          />
        ))}

        {open && selectedStory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${selectedStory.previewImageUrl})`,
                filter: "blur(20px) brightness(0.3)",
                transform: "scale(1.1)",
              }}
            />

            <div className="absolute inset-0 bg-black/40" />

            <div className="relative z-10" style={{ width: 520 }}>
              <button
                className="absolute -right-12 -top-12 z-30 text-white/80 hover:text-white transition-colors"
                onClick={handleClose}
              >
                <X className="w-10 h-10" />
              </button>

              <ReactStories
                onAllStoriesEnd={handleClose}
                stories={selectedStory.items.map((item) => ({
                  url: item.sourceUrl,
                }))}
                defaultInterval={3000}
                width={520}
                height={800}
                keyboardNavigation
              />
            </div>
          </div>
        )}
      </Container>
    </>
  );
};
