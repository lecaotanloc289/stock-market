"use client";
import { useEffect, useRef } from "react";

const useTradingViewWidget = (
  scriptURL: string,
  config: Record<string, unknown>,
  height = 600
) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!containerRef.current) return;
    if (containerRef.current.dataset.loaded) return;
    containerRef.current.innerHTML = `<div class="tradingview-widget-container__widget" style="width: 100%; height: ${height}px"></div>`;

    const script = document.createElement("script");
    script.src = scriptURL;
    script.async = true;
    script.innerHTML = JSON.stringify(config);

    containerRef.current?.appendChild(script);
    containerRef.current.dataset.loaded = "true";

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
        delete containerRef.current.dataset.loaded;
      }
    };
  }, [scriptURL, config, height]);

  return containerRef;
};

export default useTradingViewWidget;
