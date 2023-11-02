import { render } from "@testing-library/react";
import Todos from "./Todos";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { I18nextProvider } from "react-i18next";
import i18n from "../../lib/i18n";

test("renders todos component", () => {
  const queryClient = new QueryClient();
  render(
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <Todos />
      </QueryClientProvider>
    </I18nextProvider>
  );
});
