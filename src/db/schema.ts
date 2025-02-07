import { sql } from "drizzle-orm";
import {
  pgTable,
  integer,
  text,
  jsonb,
  serial,
  timestamp,
  bigint,
  index,
} from "drizzle-orm/pg-core";

const advocates = pgTable(
  "advocates",
  {
    id: serial("id").primaryKey(),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    city: text("city").notNull(),
    degree: text("degree").notNull(),
    specialties: jsonb("payload").default([]).notNull(),
    yearsOfExperience: integer("years_of_experience").notNull(),
    phoneNumber: bigint("phone_number", { mode: "number" }).notNull(),
    createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  },
  /** add indexes to first name, last name, and city for more efficient db queries */
  (table) => {
    return {
      firstNameIdx: index("ix_first_name").on(table.firstName),
      lastNameIdx: index("ix_last_name").on(table.lastName),
      cityIdx: index("ix_city").on(table.city),
    };
  }
);

export { advocates };
