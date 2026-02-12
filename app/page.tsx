import SlideToBegin from "./components/SlideToBegin";

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#FCFFE8",
        display: "flex",
        justifyContent: "center",
        padding: "64px 24px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 390,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
        }}
      >
        {/* top section */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
          <h1
            style={{
              margin: 0,
              fontSize: 40,
              lineHeight: 1,
              color: "#8C7C6F",
              fontWeight: 400,
              textAlign: "center",
              fontFamily: "'Rubik Bubbles', system-ui",
            }}
          >
            Hi, husky ;-;
          </h1>

          <img
            src="/calendar.png"
            alt="February calendar"
            style={{
              width: 260,
              height: "auto",
              display: "block",
            }}
          />
        </div>

        {/* bottom section */}
        <div style={{ paddingBottom: 12 }}>
          <SlideToBegin href="/password" />
        </div>
      </div>
    </main>
  );
}