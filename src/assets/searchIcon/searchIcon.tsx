interface SearchIconProps {
    className?: string;
}

export const SearchIcon = ({ className }: SearchIconProps) => {
    return (
        <svg
            className={`search__circle__svg ${className || ''}`}
            width='20'
            height='20'
            viewBox='0 0 30 30'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M28.5 28.5L21.975 21.975M25.5 13.5C25.5 20.1275 20.1275 25.5 13.5 25.5C6.87258 25.5 1.5 20.1275 1.5 13.5C1.5 6.87258 6.87258 1.5 13.5 1.5C20.1275 1.5 25.5 6.87258 25.5 13.5Z'
                stroke='white'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
};
