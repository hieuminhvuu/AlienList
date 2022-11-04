import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Auth from "pages/Auth/Auth";
import Landing from "pages/Auth/Landing";
import AuthContextProvider from "contexts/AuthContext";
import DashBoard from "pages/DashBoard/DashBoard";
import Board from "pages/Board/Board";
import ProtectedRoute from "actions/routing/ProtectedRoute";
import BoardContentProvider from "contexts/BoardContext";

function App() {
    return (
        <AuthContextProvider>
            <BoardContentProvider>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Landing} />
                        <Route
                            exact
                            path="/login"
                            render={(props) => (
                                <Auth {...props} authRoute="login" />
                            )}
                        />
                        <Route
                            exact
                            path="/register"
                            render={(props) => (
                                <Auth {...props} authRoute="register" />
                            )}
                        />
                        <ProtectedRoute
                            exact
                            path="/dashboard"
                            component={DashBoard}
                        />
                        <ProtectedRoute
                            exact
                            path="/dashboard/:id"
                            component={Board}
                        />
                    </Switch>
                </Router>
            </BoardContentProvider>
        </AuthContextProvider>
    );
}

export default App;
