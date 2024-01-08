import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { SearchIcon } from "@nextui-org/shared-icons";
import { useEffect, useState } from "react";
import { Company } from "@/scripts/types/company";

export const SearchBar = () => {
  const [value, setValue] = useState("");
  const [items, setItems] = useState<{ label: string; value: string }[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      const res = await fetch(`/api/company/autocomplete?keyword=${value}`);
      if (res.ok) {
        const json = await res.json();
        setItems(
          (json.data as Pick<Company, "name" | "securitiesCode">[]).map(
            (d) => ({
              label: d.name,
              value: d.securitiesCode,
            }),
          ),
        );
      }
    };

    fetchItems().catch(console.error);
  }, [value]);

  return (
    <Autocomplete
      variant={"bordered"}
      labelPlacement={"outside-left"}
      defaultItems={items}
      onInputChange={(_value) => setValue(_value)}
      startContent={<SearchIcon />}
    >
      {(item) => (
        <AutocompleteItem key={item.value} href={`/company/${item.value}`}>
          {item.label}
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
};
