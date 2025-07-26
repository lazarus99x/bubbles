import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  checkTableExists,
  describeTable,
} from "@/integrations/supabase/checkTableExists";
import {
  getAllSiteSettings,
  updateSiteSetting,
} from "@/integrations/supabase/siteSettings";
import { Textarea } from "../ui/textarea";
import { ScrollArea } from "../ui/scroll-area";

const DatabaseDebugger = () => {
  const [output, setOutput] = useState<string>("");
  const [testSettingKey, setTestSettingKey] = useState<string>("test_setting");
  const [testSettingValue, setTestSettingValue] =
    useState<string>("test value");

  const appendOutput = (text: string) => {
    setOutput((prev) => prev + "\n" + text);
  };

  const clearOutput = () => {
    setOutput("");
  };

  const checkSiteSettingsTable = async () => {
    clearOutput();
    try {
      appendOutput("Checking if site_settings table exists...");
      const exists = await checkTableExists("site_settings");
      appendOutput(`Table exists: ${exists}`);

      if (exists) {
        appendOutput("Getting table structure...");
        const structure = await describeTable("site_settings");
        appendOutput(`Table structure: ${JSON.stringify(structure, null, 2)}`);
      }
    } catch (error) {
      appendOutput(`Error: ${JSON.stringify(error)}`);
    }
  };

  const testGetAllSettings = async () => {
    clearOutput();
    try {
      appendOutput("Fetching all site settings...");
      const settings = await getAllSiteSettings();
      appendOutput(`Settings retrieved: ${JSON.stringify(settings, null, 2)}`);
    } catch (error) {
      appendOutput(`Error: ${JSON.stringify(error)}`);
    }
  };

  const testUpdateSetting = async () => {
    clearOutput();
    try {
      appendOutput(
        `Updating setting "${testSettingKey}" with value "${testSettingValue}"...`
      );
      await updateSiteSetting(testSettingKey, testSettingValue);
      appendOutput("Update complete. Fetching all settings to verify...");

      const settings = await getAllSiteSettings();
      appendOutput(
        `Settings after update: ${JSON.stringify(settings, null, 2)}`
      );

      if (settings[testSettingKey] === testSettingValue) {
        appendOutput("✅ TEST PASSED: Setting was updated successfully.");
      } else {
        appendOutput(
          `❌ TEST FAILED: Setting was not updated. Current value: "${settings[testSettingKey]}"`
        );
      }
    } catch (error) {
      appendOutput(`Error: ${JSON.stringify(error)}`);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Database Debugger</CardTitle>
        <CardDescription>
          Tools to diagnose site settings database issues
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <Button onClick={checkSiteSettingsTable} variant="outline">
              Check site_settings Table
            </Button>
            <Button onClick={testGetAllSettings} variant="outline">
              Test Get All Settings
            </Button>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={testSettingKey}
                onChange={(e) => setTestSettingKey(e.target.value)}
                placeholder="Setting key"
                className="px-3 py-2 border rounded text-black"
              />
              <input
                type="text"
                value={testSettingValue}
                onChange={(e) => setTestSettingValue(e.target.value)}
                placeholder="Setting value"
                className="px-3 py-2 border rounded text-black"
              />
              <Button onClick={testUpdateSetting} variant="outline">
                Test Update Setting
              </Button>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex justify-between mb-2">
              <h3 className="text-md font-medium">Output</h3>
              <Button onClick={clearOutput} variant="ghost" size="sm">
                Clear
              </Button>
            </div>
            <ScrollArea className="h-60 w-full border rounded-md p-4 bg-black text-white">
              <pre className="whitespace-pre-wrap">
                {output || "No output yet."}
              </pre>
            </ScrollArea>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DatabaseDebugger;
