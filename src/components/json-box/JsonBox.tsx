import React from 'react';
import { useJsonBoxStyles } from './JsonBoxStyles';


export function JsonBox({ data }: any) {
    const classes = useJsonBoxStyles();

    if(!data) return <div className={classes.root} children="No data" />

    const KeyValue: any = ({ key, value }: any): any => {
        return (
            <div className={classes.row}>
            <span children={`${key}:`} style={{ marginRight: "10px" }} />
                <FormatedValue value={value} />
            </div>
        )
    }

    const FormatedValue = ({ value }: any) => {
        if(typeof value == "string") return <span children={`"${value}"`} style={{ color: "green" }} />;
        if(typeof value == "number") return <span children={value} style={{ color: "orange" }} />;
        if(typeof value == "boolean") return <span children={value ? "true" : "false"} style={{ color: "red" }} />;
        if(Array.isArray(value)) return <span className={classes.row} children={`[ ${value.join(", ")} ]`} />;
        if(typeof value == "string") return <span children={`"${value}"`} />;
        return <span children={value} />;
    }

    const createJson: any = (parent: any, root: any, level: number): any => {
        if(Object.keys(root).length == 0) return <KeyValue key={parent} value={""} />;

        const children = Object.keys(root).map((key: string) => {
            console.log({ key });
            
            if(({}).constructor == root[key].constructor) return createJson(key, root[key], level + 1);
            return <KeyValue key={key} value={root[key]} />
        });

        if(!parent) return (
            <div className={classes.column}>
                <span children="{" />
                <span className={classes.column} children={children} style={{ marginLeft: `${10 * level}px`}} />
                <span children="}" />
            </div>
        );

        return (
            <div className={classes.column}>
                <span children={parent} />
                <span className={classes.column} children={children} style={{ marginLeft: `${10 * level}px`}} />
            </div>
        )
    }

    return (
        <div className={classes.root} children={createJson(null, data, 1)} />
    )
}