'use client'
export const runtime = "edge";

import { useState } from 'react'
import watermark from 'watermarkjs'

export default function ImageWatermarker() {
  const [originalImage, setOriginalImage] = useState(null)
  const [watermarkedImage, setWatermarkedImage] = useState(null)

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setOriginalImage(e.target?.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const addWatermark = () => {
    if (originalImage) {
      watermark([originalImage])
        .image(watermark.text.lowerRight('Watermarked', '40px serif', '#fff', 0.5))
        .then((img) => {
          setWatermarkedImage(img.src)
        })
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="mb-4"
      />
      {originalImage && (
        <div className="flex flex-col items-center gap-4">
          <image src={originalImage} alt="Original" className="max-w-md mb-4" />
          <button
            onClick={addWatermark}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Watermark
          </button>
        </div>
      )}
      {watermarkedImage && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Watermarked Image:</h2>
          <image src={watermarkedImage} alt="Watermarked" className="max-w-md" />
        </div>
      )}
    </div>
  )
}

