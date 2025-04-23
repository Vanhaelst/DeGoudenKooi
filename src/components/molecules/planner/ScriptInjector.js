import React, { useEffect, useRef } from "react";

function ScriptInjector({
  src,
  id,
  async = true,
  defer = false,
  scriptProps,
  divProps,
}) {
  const containerRef = useRef(null); // Ref to the div where the script will be injected
  const injectedRef = useRef();

  useEffect(() => {
    // Ensure src is provided and the container div is mounted
    if (!src || !containerRef.current) {
      console.warn(
        "IFrame: `src` prop is required or container ref is not available.",
      );
      return;
    }

    // Create the script element
    const script = document.createElement("script");
    script.src = src;
    script.async = async;
    script.defer = defer;

    // Assign ID if provided
    if (id) {
      script.id = id;
    }
    Object.keys(scriptProps || {}).forEach((key) => {
      // @ts-ignore
      script[key] = scriptProps[key];
    });

    injectedRef.current = {
      src,
      id,
    };

    // Append the script to the container div
    const currentContainer = containerRef.current; // Capture ref value for cleanup closure
    currentContainer.appendChild(script);
    console.log(`IFrame: Appended script with src "${src}"`);

    // Cleanup function: remove the script when the component unmounts
    // or when dependencies (src, id, async, defer) change.
    return () => {
      console.log(`IFrame: Cleaning up script with src "${src}"`);
      // Check if the script still exists within the container before attempting removal
      if (currentContainer && currentContainer.contains(script)) {
        currentContainer.removeChild(script);
        console.log(`IFrame: Removed script with src "${src}"`);
      } else {
        console.log(
          `IFrame: Script with src "${src}" already removed or container unmounted.`,
        );
      }
    };

    // Dependencies array: Ensures the effect re-runs if these props change.
    // Changes will trigger the cleanup function first, then re-run the effect.
  }, [src, id, async, defer, scriptProps]);

  // Render the div container that will hold the script
  // You can add styles or other attributes to this div as needed
  return <div ref={containerRef} {...divProps} />;
}

export default ScriptInjector;
