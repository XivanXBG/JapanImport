import { Component, useEffect } from "react";
import { useNavigate } from "react-router-dom";


class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error, errorInfo) {

    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {

      return <ErrorFallback />;
    }


    return this.props.children;
  }
}

const ErrorFallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate("/404");
    }, 1000);


    return () => clearTimeout(timeoutId);
  }, [navigate]);

  return (
    <>
      <h1 style={{textAlign:'center'}}>Failed loading component</h1>
      <h4 style={{textAlign:'center'}}>Press CTRL-F5 to reset</h4>
    </>
  );
};

export default ErrorBoundary;
