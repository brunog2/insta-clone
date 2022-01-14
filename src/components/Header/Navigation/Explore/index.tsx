import React, { useEffect, useState, CSSProperties } from 'react';

interface ExploreProps {
    selected?: boolean,
    className?: string,
    onClick?: () => void
}

const Explore: React.FC<ExploreProps> = (props) => {
    const [selected, setSelected] = useState<boolean>();

    useEffect(() => {
        setSelected(props.selected)
    }, [props.selected])
    return (
        <div className='explore' onClick={props.onClick}>
                        <svg aria-label="Encontrar pessoas" className="exploreIcon" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
                            {selected ?
                                <path d="M13.173 13.164l1.491-3.829-3.83 1.49zM12.001.5a11.5 11.5 0 1011.5 11.5A11.513 11.513 0 0012.001.5zm5.35 7.443l-2.478 6.369a1 1 0 01-.57.569l-6.36 2.47a1 1 0 01-1.294-1.294l2.48-6.369a1 1 0 01.57-.569l6.359-2.47a1 1 0 011.294 1.294z">
                                </path>
                                :
                                <>
                                    <polygon fill="none" points="13.941 13.953 7.581 16.424 10.06 10.056 16.42 7.585 13.941 13.953" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                                    </polygon>
                                    <polygon fill-rule="evenodd" points="10.06 10.056 13.949 13.945 7.581 16.424 10.06 10.056">
                                    </polygon>
                                    <circle cx="12.001" cy="12.005" fill="none" r="10.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                                    </circle>
                                </>
                            }

                        </svg>
                    </div>
    )
};

export default Explore;