import { Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import Layout from "../components/layout/Layout";
import PrivateRoute from "./PrivateRoute";

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        {routes.map(({ id, path, Element, children, isPrivate }) => {
          if (children) {
            return (
              <Route
                key={id}
                path={path}
                element={
                  isPrivate ? (
                    <PrivateRoute>
                      <Element />
                    </PrivateRoute>
                  ) : (
                    <Element />
                  )
                }
              >
                {children.map(
                  ({
                    id: childId,
                    path: childPath,
                    Element: ChildElement,
                    isPrivate: isChildPrivate,
                  }) => {
                    return (
                      <Route
                        key={childId}
                        path={childPath}
                        element={
                          isChildPrivate ? (
                            <PrivateRoute>
                              <ChildElement />
                            </PrivateRoute>
                          ) : (
                            <ChildElement />
                          )
                        }
                      />
                    );
                  }
                )}
              </Route>
            );
          }
          return (
            <Route
              key={id}
              path={path}
              element={
                isPrivate ? (
                  <PrivateRoute>
                    <Element />
                  </PrivateRoute>
                ) : (
                  <Element />
                )
              }
            />
          );
        })}
      </Route>
      <Route path="*" element={<h1>Not found</h1>} />
    </Routes>
  );
};
export default AppRouter;
