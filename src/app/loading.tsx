import React from "react";

import ShuffleLoader from "@me/components/loader/shuffle-loader";

export default function Loading() {
  return (
    <div className="flex h-screen w-screen items-center justify-center ">
      <ShuffleLoader />
    </div>
  );
}
