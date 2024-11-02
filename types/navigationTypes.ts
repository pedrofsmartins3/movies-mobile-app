export type RootStackParamList = {
    Serie: { id: string };  
    Filme: { id: string };  
  };
  
  // Export type for navigation
  export type NavigationProps<T extends keyof RootStackParamList> = {
    route: {
      params: RootStackParamList[T];
    };
    navigation: {
      navigate: (screen: T, params: RootStackParamList[T]) => void;
    };
  };