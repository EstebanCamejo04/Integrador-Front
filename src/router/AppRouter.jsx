import { Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import Layout from "../components/layout/Layout";

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        {routes.map(({ id, path, Element, children }) => {
          if (children) {
            return (
              <Route key={id} path={path} element={<Element />}>
                {children.map(
                  ({ id: childId, path: childPath, Element: ChildElement }) => (
                    <Route
                      key={childId}
                      path={childPath}
                      element={<ChildElement />}
                    />
                  )
                )}
              </Route>
            );
          }
          return <Route key={id} path={path} element={<Element />} />;
        })}
      </Route>
      <Route path="*" element={<h1>Not found</h1>} />
    </Routes>
  );
};
export default AppRouter;
