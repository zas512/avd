"use client";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, PhoneOff } from "lucide-react";
import JsSIP from "jssip";
import { useProtectedRoute } from "@/hooks/use-protected-route";

export default function HomePage() {
  // Protected route - redirects to login if not authenticated
  const { isLoading: authLoading } = useProtectedRoute();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [callStatus, setCallStatus] = useState("");
  const uaRef = useRef<JsSIP.UA | null>(null);
  const currentCallRef = useRef(null);

  if (authLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  const handleCall = () => {
    if (!uaRef.current) {
      setCallStatus("Not registered. Please configure your SIP settings.");
      return;
    }

    if (currentCallRef.current) {
      // End current call
      currentCallRef.current = null;
      setIsConnected(false);
      setCallStatus("Call ended");
      return;
    }

    if (!phoneNumber) {
      setCallStatus("Please enter a phone number");
    }
  };

  const handleNumberClick = (num: string) => {
    setPhoneNumber((prev) => prev + num);
  };

  const handleClear = () => {
    setPhoneNumber("");
  };

  const handleBackspace = () => {
    setPhoneNumber((prev) => prev.slice(0, -1));
  };

  return authLoading ? (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-muted-foreground">Loading...</div>
    </div>
  ) : (
    <div className="space-y-6">
      <Card className="glass-depth">
        <CardHeader>
          <CardTitle>Important Notices</CardTitle>
          <CardDescription>Real-time insights into your dialer environment.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <div>
            <div className="text-sm text-muted-foreground">SIP Registration</div>
            <div className="text-base font-semibold text-foreground">
              {callStatus || "Awaiting registration"}
            </div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Active Call</div>
            <div className="text-base font-semibold text-foreground">
              {isConnected ? "In progress" : "No active calls"}
            </div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">WebSocket Status</div>
            <div className="text-base font-semibold text-foreground">
              {uaRef.current ? "Configured" : "Not configured"}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Dialer */}
        <Card className="glass-depth lg:col-span-2">
        <CardHeader>
          <CardTitle>Dialer</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Phone Number Display */}
          <div className="rounded-lg border border-border p-4 text-center">
            <Input
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter number or dial"
              className="text-2xl text-center"
            />
          </div>

          {/* Status */}
          <div className="text-center">
            <div
              className={`inline-block rounded-full px-4 py-2 text-sm ${
                isConnected
                  ? "bg-green-500/20 text-green-500"
                  : "bg-red-500/20 text-red-400"
              }`}
            >
              {callStatus || (isConnected ? "Ready" : "Not registered")}
            </div>
          </div>

          {/* Keypad */}
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, "*", 0, "#"].map((num) => (
              <Button
                key={num}
                onClick={() => handleNumberClick(String(num))}
                className="h-16 text-xl"
                variant="outline"
              >
                {num}
              </Button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button onClick={handleClear} className="flex-1" variant="outline">
              Clear
            </Button>
            <Button
              onClick={handleBackspace}
              className="flex-1"
              variant="outline"
            >
              ←
            </Button>
          </div>

          {/* Call Button */}
          <Button
            onClick={handleCall}
            className={`w-full h-16 text-lg ${
              isConnected ? "bg-destructive hover:bg-destructive/90" : ""
            }`}
            disabled={!isConnected}
          >
            {isConnected ? (
              <>
                <PhoneOff className="w-5 h-5 mr-2" />
                End Call
              </>
            ) : (
              <>
                <Phone className="w-5 h-5 mr-2" />
                Call
              </>
            )}
          </Button>
        </CardContent>
      </Card>

        {/* Info Panel */}
        <Card className="glass-depth">
          <CardHeader>
            <CardTitle>Connection Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">SIP Status:</span>
                <span
                  className={
                    isConnected
                      ? "text-green-600 dark:text-green-400"
                      : "text-destructive"
                  }
                >
                  {isConnected ? "Connected" : "Disconnected"}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Call Status:</span>
                <span
                  className={
                    isConnected
                      ? "text-green-600 dark:text-green-400"
                      : "text-muted-foreground"
                  }
                >
                  {isConnected ? "In Call" : "Idle"}
                </span>
              </div>
            </div>
            <div className="space-y-3 rounded-lg border border-border p-4 text-sm">
              <h3 className="text-sm font-semibold text-foreground">
                Quick Tips
              </h3>
              <p className="text-sm text-muted-foreground">
                Configure your SIP settings in the configuration file to start
                placing calls.
              </p>
              <ul className="list-disc space-y-1 pl-6 text-muted-foreground">
                <li>Ensure your WebSocket connection is reachable.</li>
                <li>Use secure credentials for your SIP accounts.</li>
                <li>
                  Review call logs regularly to monitor call quality and uptime.
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
