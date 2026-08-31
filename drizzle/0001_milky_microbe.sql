ALTER TABLE "urls" DROP CONSTRAINT "urls_slug_unique";--> statement-breakpoint
CREATE INDEX "idx_slug" ON "urls" USING btree ("slug");--> statement-breakpoint
ALTER TABLE "urls" ADD CONSTRAINT "unq_slug" UNIQUE("slug");