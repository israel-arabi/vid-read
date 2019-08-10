import React, { useState, BaseSyntheticEvent } from "react";

export function WordsWiki(props: { translation: string; ar: string; }) {
    return (
        <div
            style={{
                marginRight: 5,
                padding: "5px 6px 0px"
            }}
        >
            <div
                style={{
                    display: 'flex',
                    marginTop: 20,
                }}
            >
                <div
                    style={{
                        marginLeft: 10
                    }}
                >תרגום</div>
                <div>{props.translation}</div>
            </div>
            <div
                style={{
                    display: 'flex',
                    marginTop: 20,
                }}
            >
                <div
                    style={{
                        marginLeft: 10
                    }}
                >ערבית</div>
                <div>{props.ar}</div>
            </div>
        </div>
    );
}