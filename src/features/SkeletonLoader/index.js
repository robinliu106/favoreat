import React from "react";
import "./SkeletonLoader.css";

const SkeletonLoader = ({ num = 10 }) => {
    const blankArray = new Array(5).fill(0);
    return (
        <div className="container-sm">
            <div className="row">
                <div className="col">
                    <div className="skeleton-card container-sm">
                        {blankArray.map((value, index) => (
                            <div className="skeleton-card__description loading" key={index}></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkeletonLoader;
