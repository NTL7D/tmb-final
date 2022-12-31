import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import { DataProvider } from "./GlobalState";
import DefaultLayout from "./components/layout";
import pageRoutes from "./router";
function App() {
    return (
        <>
            <DataProvider>
                <Routes>
                    {pageRoutes.map((route, index) => {
                        let Layout = DefaultLayout;
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </DataProvider>
        </>
    );
}

export default App;
