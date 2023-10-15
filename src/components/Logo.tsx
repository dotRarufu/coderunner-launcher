import { useEffect } from 'react';

const { api } = window;

const Logo = () => {
  return (
    <div className="py-6 w-full max-w-xs object-cover mx-auto">
      <img
        src={`${api.getAssetPath(['assets', 'title.png'])}`}
        alt="CodeRunner Logo"
      />
    </div>
  );
};

export default Logo;
