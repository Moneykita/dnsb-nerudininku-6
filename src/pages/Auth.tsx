import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AuthError, AuthApiError } from "@supabase/supabase-js";
import Layout from "@/components/layout/Layout";

const Auth = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session) {
          navigate("/");
        }
        if (event === "USER_UPDATED") {
          const { error } = await supabase.auth.getSession();
          if (error) {
            setErrorMessage(getErrorMessage(error));
          }
        }
        if (event === "SIGNED_OUT") {
          setErrorMessage("");
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  const getErrorMessage = (error: AuthError) => {
    if (error instanceof AuthApiError) {
      switch (error.code) {
        case "invalid_credentials":
          return "Neteisingas el. paštas arba slaptažodis.";
        case "email_not_confirmed":
          return "Prašome patvirtinti savo el. pašto adresą.";
        case "user_not_found":
          return "Vartotojas su šiais duomenimis nerastas.";
        case "invalid_grant":
          return "Neteisingi prisijungimo duomenys.";
        default:
          return error.message;
      }
    }
    return error.message;
  };

  return (
    <Layout>
      <div className="container max-w-md mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Prisijungimas</h1>
        {errorMessage && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}
        <div className="bg-white p-6 rounded-lg shadow">
          <SupabaseAuth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#0f172a',
                    brandAccent: '#334155',
                  },
                },
              },
            }}
            localization={{
              variables: {
                sign_in: {
                  email_label: "El. pašto adresas",
                  password_label: "Slaptažodis",
                  button_label: "Prisijungti",
                },
                sign_up: {
                  email_label: "El. pašto adresas",
                  password_label: "Slaptažodis",
                  button_label: "Registruotis",
                },
              },
            }}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Auth;