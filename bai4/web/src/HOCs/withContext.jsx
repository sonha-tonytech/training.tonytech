import React from "react";
import { AuthContext } from "contexts/authcontext";
import Loader from "components/loader";

const withContext = (Component, arrayContexts) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: false,
      };
    }
    static contextType = AuthContext;

    handleSetLoading = (loading) => {
      this.setState({ loading: loading });
    };

    componentDidMount = async () => {
      await this.context.checkToken();
    };

    nestContextConsumer = (Component, Contexts) => {
      const commonProps = {
        ...this.props,
        handleSetLoading: this.handleSetLoading,
      };

      if (Contexts.length > 0) {
        const contextProps = Contexts.reduce((acc, cur) => {
          const [[key, context]] = Object.entries(cur);

          return {
            ...(acc || {}),
            [key]: context.Consumer._currentValue,
          };
        }, null);

        const nestComponent = Contexts.reduceRight((acc, context) => {
          const curContext = Object.values(context)[0];
          return (
            <curContext.Consumer>
              {() => {
                if (!acc) {
                  return <Component {...commonProps} {...contextProps} />;
                }
                return acc;
              }}
            </curContext.Consumer>
          );
        }, null);
        return nestComponent;
      } else {
        return <Component {...commonProps} />;
      }
    };

    render() {
      return (
        <>
          {this.nestContextConsumer(Component, arrayContexts)}
          {this.state.loading && <Loader />}
        </>
      );
    }
  };
};

export default withContext;
