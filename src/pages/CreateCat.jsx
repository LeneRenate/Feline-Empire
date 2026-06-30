import { Button } from "@/components/ui/button";
import styles from "../styles/CreateCat.module.css";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { epithetsList } from "@/data/cat/epithet";
import { royalTitles } from "@/data/cat/title";
import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateCat() {
  const navigate = useNavigate();
  const [pronouns, setPronouns] = useState("");
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [epithet, setEpithet] = useState("");
  // const [avatar, setAvatar] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState("");

  const titlesOpt = royalTitles;
  const epithetsOpt = epithetsList;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsCreating(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const result = await supabase
        .from("cats")
        .insert({ name, title, epithet, pronouns, user_id: user.id });

      if (result.error) {
        setError("Couldn't create cat..");
      } else {
        navigate("/create_empire");
        // navigate to create empire when page is made
      }
    } catch {
      setError("Something went wrong. Please try again");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <>
      <Card className={`w-4/5 mx-auto ${styles.section}`}>
        <CardHeader>
          <CardTitle className="font-bold text-2xl uppercase">
            Create your cat-ruler
          </CardTitle>
          <CardDescription>
            Well, cat any way.. (as all cats are already rulers)
          </CardDescription>

          <CardContent className="mt-16">
            <form onSubmit={handleSubmit}>
              <FieldGroup className="flex flex-col justify-center gap-12">
                <Field>
                  <div className="flex flex-row gap-2 justify-start items-center">
                    <label>Enter</label>
                    <Select
                      value={pronouns}
                      onValueChange={(value) => setPronouns(value)}
                      required
                    >
                      <SelectTrigger className="w-20">
                        <SelectValue placeholder="???" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="his">HIS</SelectItem>
                          <SelectItem value="her">HER</SelectItem>
                          <SelectItem value="their">THEIR</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <label>Majesty's info under</label>
                  </div>
                </Field>

                <FieldSeparator />

                <Field>
                  <FieldLabel>Name your cat</FieldLabel>
                  <Input
                    type="text "
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <p>Max. 10 characters</p>
                </Field>

                <FieldSeparator />

                <Field>
                  <FieldLabel>Select a title</FieldLabel>
                  <Select
                    value={title}
                    onValueChange={(value) => setTitle(value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="King" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectGroup>
                        {titlesOpt.map((title) => (
                          <SelectItem key={title} value={title}>
                            {title}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>

                <FieldSeparator />

                <Field>
                  <FieldLabel>Select an epithet</FieldLabel>
                  <Select
                    value={epithet}
                    onValueChange={(value) => setEpithet(value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="the Fearless" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectGroup>
                        {epithetsOpt.map((epithet) => (
                          <SelectItem key={epithet.value} value={epithet.value}>
                            {epithet.value}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>

                <FieldSeparator />

                <Field>
                  <Button
                    type="submit"
                    className=" w-1/2! mx-auto py-6 uppercase"
                  >
                    {isCreating ? "Prepares empire" : "Bring me meow empire!"}
                  </Button>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </CardHeader>
      </Card>
    </>
  );
}

export { CreateCat };
