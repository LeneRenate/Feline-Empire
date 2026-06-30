import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { epithetsList } from "@/data/cat/epithet";
import { greeting } from "@/data/common/greeting";
import { supabase } from "@/lib/supabase";
import { useState, useEffect } from "react";

function ProfilePage() {
  const [cat, setCat] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const greetingLine = greeting;

  useEffect(() => {
    async function fetchCat() {
      setError("");
      setIsLoading(true);

      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        const { data, error } = await supabase
          .from("cats")
          .select("*")
          .eq("user_id", user.id)
          .single();

        if (error) {
          setError(error || "Can't find cat");
        }

        console.log(data);
        setCat(data);

        // Get name of empire also
        // const empire =
      } catch {
        setError("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCat();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message ?? error}</p>;
  if (!cat) return null;

  const epithetData = epithetsList.find((e) => e.value === cat.epithet);
  const personality = epithetData.personality;
  const bonusTrait = epithetData.bonus;

  const displayName = `${cat.title} ${cat.name} ${cat.epithet}`;

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{greetingLine}</CardTitle>
        </CardHeader>

        <CardContent>
          <h1>{displayName}</h1>
          {/* <h2>of {empire}</h2> */}

          <p>Personality: {personality}</p>
          <p>Bonus trait: {bonusTrait}</p>
        </CardContent>
      </Card>
    </>
  );
}

export { ProfilePage };
