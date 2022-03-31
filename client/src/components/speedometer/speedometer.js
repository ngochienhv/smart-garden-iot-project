import React from "react";
import Speedometer from "react-d3-speedometer";

export default function Speedometers({ data, minValue, maxValue }) {
    return (
        <div className="App">
            <div>
                <Speedometer
                    minValue={minValue}
                    maxValue={maxValue}
                    width={400}
                    height={400}
                    needleHeightRatio={0.8}
                    ringWidth={30}
                    segments={5}
                    value={parseInt(data)}
                    segmentColors={[
                        "#7ab55c",
                        "#385828",
                        "#f2db5b",
                        "#ec5555",
                        "#b81414"
                    ]}
                    needleColor="white"
                />
            </div>
        </div>
    );
}
