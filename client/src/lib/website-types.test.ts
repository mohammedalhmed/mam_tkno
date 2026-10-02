import { describe, expect, it } from "vitest";
import { websiteTypeMap, websiteTypes } from "./website-types";
import { projects } from "./portfolio-data";

describe("website type configuration", () => {
  it("uses unique ids and codes", () => {
    expect(new Set(websiteTypes.map(type => type.id)).size).toBe(websiteTypes.length);
    expect(new Set(websiteTypes.map(type => type.code)).size).toBe(websiteTypes.length);
  });

  it("keeps recommendations linked to declared optional features", () => {
    for (const type of websiteTypes) {
      const featureIds = new Set(type.optionalFeatures.map(feature => feature.id));
      expect(new Set(featureIds).size).toBe(type.optionalFeatures.length);

      for (const recommendation of type.recommendedFeatures) {
        expect(featureIds.has(recommendation.featureId)).toBe(true);
      }
    }
  });

  it("uses unique intake fields and secure source URLs", () => {
    for (const type of websiteTypes) {
      const intakeIds = type.intakeFields.map(field => field.id);
      expect(new Set(intakeIds).size).toBe(intakeIds.length);

      for (const source of type.sources) {
        expect(source.startsWith("https://")).toBe(true);
      }
    }
  });

  it("keeps the lookup map synchronized with the source list", () => {
    expect(websiteTypeMap.size).toBe(websiteTypes.length);

    for (const type of websiteTypes) {
      expect(websiteTypeMap.get(type.id)).toBe(type);
    }
  });
});

describe("portfolio data", () => {
  it("uses unique project ids and HTTPS links", () => {
    expect(new Set(projects.map(project => project.id)).size).toBe(projects.length);

    for (const project of projects) {
      expect(project.url.startsWith("https://")).toBe(true);
      expect(project.image.startsWith("/")).toBe(true);
      expect(project.tags.length).toBeGreaterThan(0);
    }
  });
});
