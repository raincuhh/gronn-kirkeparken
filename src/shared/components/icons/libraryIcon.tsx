type LibraryIconProps = { className: string };

const LibraryIcon = ({ className }: LibraryIconProps) => {
   return (
      <>
         <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            viewBox="0 0 24 24"
         >
            <path d="M7 3h2v18H7zM4 3h2v18H4zm6 0h2v18h-2zm9.062 17.792-6.223-16.89 1.877-.692 6.223 16.89z" />
         </svg>
      </>
   );
};

export default LibraryIcon;
