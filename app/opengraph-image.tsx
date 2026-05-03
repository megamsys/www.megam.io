import { ImageResponse } from "next/og";

export const alt = "Megam.io — closure record of Megam Systems LLP and Rio/OS";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "radial-gradient(circle at 30% 20%, rgba(0,229,255,0.18), transparent 50%), #0a0a0f",
          color: "rgba(255,255,255,0.92)",
          fontFamily: "system-ui, sans-serif"
        }}
      >
        <div
          style={{
            color: "#00e5ff",
            fontSize: 28,
            letterSpacing: "0.18em",
            textTransform: "uppercase"
          }}
        >
          megam.io &nbsp;-&gt;&nbsp; closed
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 84, fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.03em" }}>
            Megam Systems LLP
          </div>
          <div style={{ fontSize: 36, color: "rgba(255,255,255,0.72)", lineHeight: 1.25 }}>
            A closure record of Megam and Rio/OS — open-source cloud management,
            built from Chennai, 2012–2018.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "rgba(255,255,255,0.45)",
            fontSize: 22,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            borderTop: "1px solid rgba(0,229,255,0.25)",
            paddingTop: 24
          }}
        >
          <span>megam.io</span>
          <span>Megam was early, not wrong.</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
