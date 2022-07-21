import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCategory } from "../../redux/actions/categoryAction";
import { getAPI } from "../../utils/FetchData";
import { RootStore } from "../../utils/TypeScript";

const Aibox = () => {
    const { categories, auth, darkMode } = useSelector((state: RootStore) => state);
    const { isdarkMode } = darkMode;
    const app = document.getElementById("app");
    const types = ['image/png', 'image/jpeg'];
    const [categor, setCategor] = useState(categories);
    const [catname, setCatname] = useState("");
    const dispatch = useDispatch()
    useEffect(() => {
        if (auth.access_token)
            setTimeout(() => {
                $('#aimodalb').trigger('click')
            }, 10000);
    }, [auth])
    const handleChangeCat = (e: any) => {
        const value = e.target.id;

        if (app)
            app.style.display = 'none';
        setCatname(e.target.innerText);
    };
    const addcat = () => {
        if (app)
            app.style.display = 'none';
        if (auth.access_token) dispatch(createCategory(catname, auth.access_token));
    };
    function showhide() {
        if (app) app.style.display = "block";
    }
    function close() {
        if (app) app.style.display = "none";
    }

    // useEffect(() => {
    //     const delayDebounce = setTimeout(async () => {
    //         try {
    //             const res = await getAPI(`categoryarray?categor=${catname}`);
    //             setCategor(res.data);
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     }, -3);
    //     return () => clearTimeout(delayDebounce);
    // }, [catname, categories]);
    return (
        <>
            <div className="modal fade" id="aimodal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="aimodalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="aimodalLabel">Set Preferance (Minimum 8)</h5>
                        </div>
                        <div className="modal-body">
                            <div className="form-group my-3">
                                <input
                                    autoComplete="off"
                                    id="inputcat"
                                    type="search"
                                    className="form-control me-2 w-100"
                                    value={catname}
                                    placeholder="Add category ..."
                                    onFocus={(e) => showhide()}
                                    onChange={(e) => setCatname(e.target.value)}
                                />
                                <div
                                    className="container pt-2 px-1 w-100 rounded position-relative"
                                    id="app"
                                    style={{
                                        marginTop: 2,
                                        background: "#cbcaca",
                                        zIndex: 10,
                                        maxHeight: "calc(100vh - 100px)",
                                        maxWidth: 450,
                                        overflow: "auto",
                                        paddingBottom: 3,
                                        display: "none",
                                    }}
                                >
                                    <span className="btn btn-secondary p-1 position-absolute px-3" style={{ right: 5 }} onClick={e => { close() }}>&times;</span>

                                    {categor.length ?
                                        <p style={{ color: "black" }}>Select One...</p> : <></>
                                    }
                                    {categor.length === 0 ? <button className="btn btn-light py-2 m-1 pb-2" onClick={(e) => addcat()}>
                                        Add Category
                                    </button>
                                        :
                                        categor.map((category) => (
                                            <span
                                                className="btn btn-success py-1 m-1"
                                                key={category._id}
                                                id={category._id}
                                                onClick={(e) => {
                                                    handleChangeCat(e);
                                                }}
                                            >
                                                {category.name}
                                            </span>
                                        )
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">

                            <button type="button" className="btn btn-primary"> Save </button>
                        </div>
                    </div>
                </div>
            </div >
            <button type="button" className="btn btn-primary d-none" id='aimodalb' data-bs-toggle="modal" data-bs-target="#aimodal">
            </button>
        </>
    )
}

export default Aibox


