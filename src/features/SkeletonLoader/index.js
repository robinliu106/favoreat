import React from "react";
import "./SkeletonLoader.css";

const SkeletonLoader = ({ len = 10 }) => {
    const blankArray = new Array(len).fill(0);
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
