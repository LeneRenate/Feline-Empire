import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldSeparator } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { realmDescription, realmLocation } from "@/data/empire/realmName";
import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateEmpire() {
  const navigate = useNavigate();
  const [descriptor, setDescriptor] = useState("");
  const [location, setLocation] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState("");

  const empireName = descriptor && location ? `${descriptor} ${location}` : "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsCreating(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data: cat } = await supabase
        .from("cats")
        .select("id")
        .eq("user_id", user.id)
        .single();

      const result = await supabase
        .from("empires")
        .insert({ name: empireName, user_id: user.id, cat_id: cat.id });

      if (result.error) {
        setError("Couldn't found your empire..");
      } else {
        navigate("/dashboard");
      }
    } catch {
      setError("Something went wrong. Please try again");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Card className="w-4/5 mx-auto">
      <CardHeader>
        <CardTitle className="font-bold text-2xl uppercase">
          Found your empire
        </CardTitle>
        <CardDescription>Choose a name worthy of your reign</CardDescription>

        <CardContent className="mt-16">
          <form onSubmit={handleSubmit}>
            <FieldGroup className="flex flex-col justify-center gap-12">
              <Field>
                <Select
                  value={descriptor}
                  onValueChange={(value) => setDescriptor(value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Catnip" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {realmDescription.map((d) => (
                        <SelectItem key={d} value={d}>
                          {d}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>

              <Field>
                <Select
                  value={location}
                  onValueChange={(value) => setLocation(value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Valley" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {realmLocation.map((l) => (
                        <SelectItem key={l} value={l}>
                          {l}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>

              {empireName && (
                <p className="text-center text-lg font-semibold">
                  The {empireName}
                </p>
              )}

              <FieldSeparator />

              {error && <p className="text-red-500">{error}</p>}

              <Field>
                <Button
                  type="submit"
                  disabled={isCreating}
                  className="w-1/2! mx-auto py-6 uppercase"
                >
                  {isCreating ? "Founding empire..." : "Establish empire!"}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </CardHeader>
    </Card>
  );
}

export { CreateEmpire };
