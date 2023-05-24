import React from 'react'
import { Link } from 'react-router-dom'
import "./Breadcrumb.css"
import { ArrowRight2 } from 'iconsax-react'


interface PathType {
    pathList:
    {
        name?: string;
        path?: string;
    }[]

}

const Breadcrumb = (props: PathType) => {
    const { pathList } = props;

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb breadcrumb-logipro-ol">
                    {pathList.length > 0 ? (
                        pathList.map((item, index) => {
                            if (index === pathList.length - 1) {
                                return <p key={index}>{item.name}</p>;
                            }
                            else {
                                return (
                                    <Link
                                        to={{
                                            pathname: `/${item.path}`
                                        }}
                                        key={index}
                                        className="breadcrumb-item breadcrumb-logipro"
                                    >
                                        <li
                                            className={
                                                pathList.length === index + 1
                                                    ? "breadcrumb-item active"
                                                    : "breadcrumb-item"
                                            }
                                            aria-current="page"
                                        >
                                            {pathList.length === index + 1 ? item.name : item.name}

                                            <ArrowRight2
                                                style={{ margin: "0px 10px" }}
                                                size="16"
                                                color="#000"
                                            />

                                        </li>
                                    </Link>
                                );
                            }
                        })
                    ) : (
                        <></>
                    )}
                </ol>
            </nav>
        </div >
    )
}

export default Breadcrumb