import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Auth from "pages/Auth/Auth";
import Landing from "pages/Auth/Landing";
import AuthContextProvider from "contexts/AuthContext";
import DashBoard from "pages/DashBoard/DashBoard";
import ProtectedRoute from "actions/routing/ProtectedRoute";

function App() {
    return (
        <AuthContextProvider>
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
                </Switch>
            </Router>
        </AuthContextProvider>
    );
}

export default App;
