import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";

export const alt = "Sam Feibel — GNC Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const lora = await readFile(join(process.cwd(), "public/lora.ttf"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "#1b1b17",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* Subtle grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(240,237,226,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(240,237,226,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            display: "flex",
          }}
        />

        {/* Name */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            fontFamily: "Lora",
            fontSize: "120px",
            fontWeight: 400,
            color: "#f0ede2",
            lineHeight: 1,
            letterSpacing: "-0.02em",
          }}
        >
          Sam Feibel
          <span style={{ color: "#b85c38" }}>.</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Lora", data: lora, style: "normal", weight: 400 }],
    }
  );
}
