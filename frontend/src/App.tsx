import { useState } from 'react';
import axios from 'axios';

import { Search, Globe, Calendar, User, Mail, Building, Clock, Server, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface WhoisData {
  domainName?: string
  registrar?: string
  registrationDate?: string
  expirationDate?: string
  estimatedDomainAge?: string
  hostnames?: string
  registrantName?: string
  technicalContactName?: string
  administrativeContactName?: string
  contactEmail?: string
}

function App() {

  const [domain, setDomain] = useState("")
  const [dataType] = useState("domain")
  const [data, setData] = useState<WhoisData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [darkMode, setDarkMode] = useState(false)
  const API_URL = import.meta.env.VITE_API_URL

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle("dark")
  }
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!domain.trim()) {
      setError('Please enter a domain name');
      return;
    }

    setLoading(true);
    setError('');
    setData(null);

    try {
      const response = await axios.post(API_URL + '/api/whois', {
        domainName: domain.trim(),
      });

      setData(response.data);
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      setError(err.response?.data?.error || 'An error occurred while fetching domain information');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "dark" : ""}`}>
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        {/* Header */}
        <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Whois Lookup</h1>
                <p className="text-sm text-muted-foreground">Domain intelligence at your fingertips</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleDarkMode}
              className="transition-transform hover:scale-105 bg-transparent"
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 max-w-4xl flex-1">
          {/* Search Form */}
          <Card className="mb-8 shadow-lg border-0 bg-gradient-to-br from-card to-card/80">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Domain Whois Lookup
              </CardTitle>
              <CardDescription className="text-base">
                Get comprehensive domain registration and contact information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      value={domain}
                      onChange={(e) => setDomain(e.target.value)}
                      placeholder="Enter domain name (e.g., tlv300.com)"
                      className="pl-10 h-12 text-base transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                      disabled={loading}
                    />
                  </div>

                </div>
                <Button
                  type="submit"
                  className="w-full h-12 text-base font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Looking up domain...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Search className="h-4 w-4" />
                      Lookup Domain
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Error Message */}
          {error && (
            <Alert className="mb-6 border-destructive/20 bg-destructive/5 animate-in slide-in-from-top-2 duration-300">
              <AlertDescription className="text-destructive font-medium">{error}</AlertDescription>
            </Alert>
          )}

          {/* Results */}
          {data && (
            <div className="animate-in slide-in-from-bottom-4 duration-500">
              <Tabs defaultValue={dataType} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="domain" className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Domain Info
                  </TabsTrigger>
                  <TabsTrigger value="contact" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Contact Info
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="domain" className="space-y-4">
                  <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-card/80">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Globe className="h-5 w-5 text-primary" />
                        Domain Information
                      </CardTitle>
                      <CardDescription>Registration and technical details</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Globe className="h-4 w-4" />
                            Domain Name
                          </div>
                          <div className="font-mono text-lg font-semibold text-primary">{data.domainName}</div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Building className="h-4 w-4" />
                            Registrar
                          </div>
                          <div className="font-medium">{data.registrar}</div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            Registration Date
                          </div>
                          <div className="font-medium">
                            {data.registrationDate && formatDate(data.registrationDate)}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            Expiration Date
                          </div>
                          <div className="font-medium">{data.expirationDate && formatDate(data.expirationDate)}</div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            Estimated Domain Age
                          </div>
                          <Badge variant="secondary" className="font-medium">
                            {data.estimatedDomainAge}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Server className="h-4 w-4" />
                            Hostnames
                          </div>
                          <div className="font-mono text-sm bg-muted/50 p-2 rounded">{data.hostnames}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="contact" className="space-y-4">
                  <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-card/80">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5 text-primary" />
                        Contact Information
                      </CardTitle>
                      <CardDescription>Domain registration contacts</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <User className="h-4 w-4" />
                            Registrant Name
                          </div>
                          <div className="font-medium">{data.registrantName}</div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <User className="h-4 w-4" />
                            Technical Contact Name
                          </div>
                          <div className="font-medium">{data.contactEmail}</div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <User className="h-4 w-4" />
                            Administrative Contact Name
                          </div>
                          <div className="font-medium">{data.administrativeContactName}</div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Mail className="h-4 w-4" />
                            Contact Email
                          </div>
                          <div className="font-mono text-sm bg-muted/50 p-2 rounded">{data.contactEmail}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="border-t border-border bg-card/30 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-6 text-center">
            <p className="text-muted-foreground">Powered by WhoisXMLAPI • Developed by Eldren Par</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
