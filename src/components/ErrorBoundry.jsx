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
    // You can log the error or send it to an error tracking service
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render a custom error UI or redirect to a 404 page
      return <ErrorFallback />;
    }

    // If there is no error, render the children components
    return this.props.children;
  }
}

const ErrorFallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the 404 page after a delay
    const timeoutId = setTimeout(() => {
      navigate("/404");
    }, 1000);

    // Clear the timeout when the component unmounts
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
