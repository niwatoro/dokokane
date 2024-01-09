import { Description } from "@/sections/IndexSection/components/Description";
import { Layout } from "@/sections/components/Layout";
import { PreviewCard } from "@/sections/IndexSection/components/PreviewCard";
import { Heading } from "@/sections/components/Heading";
import styles from "@/styles/sections/IndexSection/index.module.css";
import { useEffect, useState } from "react";
import { Company } from "@/scripts/types/company";
import {
  Pagination,
  Select,
  SelectItem,
  Spinner,
  Switch,
} from "@nextui-org/react";
import { Center } from "@/sections/components/Center";
import { companySortableColumns } from "@/data/company";

export const IndexSection = () => {
  const [loading, setLoading] = useState(true);

  const [companies, setCompanies] = useState<Company[]>([]);
  const [order, setOrder] = useState("average_annual_salary");
  const [ascending, setAscending] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchCompanies = async () => {
      const res = await fetch(
        `/api/company/all?order=${order}&ascending=${
          ascending ? "true" : "false"
        }&page=${page}`,
      );
      if (res.ok) {
        const json = await res.json();
        setCompanies(json.data);
        setTotalPages(json.total_pages);
      }
      setLoading(false);
    };

    setLoading(true);
    fetchCompanies()
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [order, ascending, page]);

  return (
    <Layout>
      <div>
        <Description />
        <Heading>企業一覧</Heading>
        <div className={styles.sorter}>
          <span>並び替え</span>
          <Select
            variant={"bordered"}
            className={"max-w-xs"}
            labelPlacement={"outside-left"}
            defaultSelectedKeys={[order]}
            onChange={(event) => {
              const value = event.target.value;
              if (value) {
                setOrder(value);
              }
            }}
          >
            {companySortableColumns.map((column) => (
              <SelectItem key={column.value} value={column.value}>
                {column.label}
              </SelectItem>
            ))}
          </Select>
          <Switch isSelected={ascending} onValueChange={setAscending}>
            小さい順
          </Switch>
        </div>
        {loading ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <div className={styles["preview-card-container-wrapper"]}>
            <div className={styles["preview-card-container"]}>
              {companies.map((company, i) => (
                <PreviewCard key={i} company={company} selectedColumn={order} />
              ))}
            </div>
            <Pagination
              variant={"bordered"}
              total={totalPages}
              page={page}
              onChange={setPage}
            />
          </div>
        )}
      </div>
    </Layout>
  );
};
