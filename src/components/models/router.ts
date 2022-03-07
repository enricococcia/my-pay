interface Router {
  id: string;
  isVisible: boolean;
  type: string;
  path: string;
  name: string;
  element: React.ReactNode;
}

export default Router;
