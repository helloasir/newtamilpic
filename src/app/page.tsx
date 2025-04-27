"use client";

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import { FacebookIcon, TwitterIcon } from 'lucide-react';

const getImageNumber = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  return String(dayOfYear).padStart(3, '0');
};

export default function Home() {
  const [imageUrl, setImageUrl] = useState('');
  const [currentDay, setCurrentDay] = useState('');

  useEffect(() => {
    const dayOfYear = getImageNumber();
    const url = `/images/${dayOfYear}.jpg`;
    setImageUrl(url);
    setCurrentDay(dayOfYear);
  }, []);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const quote = `Daily Pic - Image for day ${currentDay}`;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-4 text-foreground">Daily Pic Post</h1>
      {imageUrl && (
        <div className="relative fade-in">
          <Image
            src={imageUrl}
            alt={`Daily Image ${currentDay}`}
            width={500}
            height={500}
            className="rounded-lg shadow-md"
          />
          <p className="mt-2 text-sm text-muted-foreground">Image for day {currentDay}</p>
        </div>
      )}
      <div className="flex mt-4 space-x-4">
        <FacebookShareButton url={shareUrl} quote={quote}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <TwitterShareButton url={shareUrl} title={quote}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
      </div>
    </div>
  );
}
