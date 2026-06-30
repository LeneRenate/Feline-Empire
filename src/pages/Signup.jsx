import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await supabase.auth.signUp({
        email,
        password,
      });

      if (result.error) {
        setError(result.error.message);
      } else {
        navigate("/create_cat");
      }
    } catch {
      setError("Something went wrong. Please try again");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Establish your rule:</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            {error && <p className="text-sm mb-4 text-red-700">{error}</p>}
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="signup-email">Email</FieldLabel>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="EmpressFloof@feline-empire.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                ></Input>
                {/* Comment with password-demands */}
              </Field>

              <Field>
                <FieldLabel htmlFor="signup-password">Password</FieldLabel>
                <Input
                  id="signup-password"
                  type="password"
                  placeholder="*******"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                ></Input>
              </Field>

              <Field>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Signing you up.." : "Sign up"}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      <Link
        to="/login"
        className="my-6 text-sm text-muted-foreground underline"
      >
        Already have a kingdom? Login here
      </Link>
    </>
  );
}

export default Signup;
