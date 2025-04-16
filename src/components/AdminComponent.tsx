"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Plane,
  DollarSign,
  Star,
  MapPin,
  Calendar,
  Trash2,
  Upload,
  RefreshCw,
  LogOut,
  ListRestart,
} from "lucide-react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import Image from "next/image";
import { TagsInput } from "@/components/ui/tags-input";

interface Booking {
  _id: string;
  startDate: string;
  adults: number;
  children: number;
  name: string;
  email: string;
  phone: string;
  paymentMethod: string;
  tourPackageBooked: string;
  tourPackagePrice: number;
  createdAt: string;
}

interface leads{
  _id: string;
  email: string;
  phone: string;
  createdAt: string;
  country: string;
  message: string;
}

export default function AdminComponent() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [heading1, setHeading1] = useState("");
  const [heading2, setHeading2] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(1);
  const [rating, setRating] = useState(1);
  const [location, setLocation] = useState("");
  const [duration, setDuration] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [tourPackages, setTourPackages] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [leads, setleads] = useState<leads[]>([]);
  const [whatIncluded, setwhatIncluded] = useState<string[]>([]);
  const [whatNotIncluded, setwhatNotIncluded] = useState<string[]>([]);
  const [tourId, setTourId] = useState("");

  const handleReload = () => {
    setIsLoading(true);
    async function fetchBookings() {
      try {
        const response = await fetch("/api/mongoDB/listBookings"); // Adjust based on your API route
        const data = await response.json();
        if (data.success) {
          setBookings(data.data);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchBookings();
    fetchTourPackages();
    fetchLeads();
  };

  const fetchLeads = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/api/mongoDB/listLeads");
      if (response.data.success) {
        setleads(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setIsLoading(true);
      setUploadProgress(0);
      const { data } = await axios.post("/api/vercelBlobUpload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total ?? 1)
          );
          setUploadProgress(percentCompleted);
        },
      });

      if (data.success) {
        setImageUrl(data.url);
        setErrorMessage(null);
      } else {
        console.error("Upload failed", data.error);
        setErrorMessage("Failed to upload image");
      }
    } catch (error) {
      console.error("Upload error", error);
      setErrorMessage("Error uploading image");
    } finally {
      setIsLoading(false);
    }
  };

  const uploadDatatoMongoDb = async () => {
    try {
      setIsLoading(true);
      const data = {
        imageUrl,
        heading1,
        heading2,
        description,
        price,
        rating,
        location,
        duration,
        whatIncluded,
        whatNotIncluded,
        keywords: keywords.join(", "),
      };
      const response = await axios.post("/api/create", data);
      toast.success("Upload Success!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      resetForm();
      fetchTourPackages();
    } catch (error) {
      toast.error("Upload Failed! Contact Nikhilesh Rana", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      console.error("Upload error", error);
      setErrorMessage("Error uploading tour package");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTourPackages = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/api/read");
      if (response.data.success) {
        setTourPackages(response.data.data);
        console.log(response.data.data);
      } else {
        console.error("Failed to fetch tour packages:", response.data.error);
      }
    } catch (error) {
      console.error("Error fetching tour packages:", error);
      setErrorMessage("Error fetching tour packages");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTourPackage = async (id: number) => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/delete/${id}`);
      fetchTourPackages();
      toast.success("Tour Package Deleted!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    } catch (error) {
      toast.error("Failed to Delete!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      console.error("Error deleting tour package:", error);
      setErrorMessage("Error deleting tour package");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteImage = async (url: string) => {
    try {
      const response = await axios.delete("/api/vercelBlobDelete", {
        data: { url },
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const resetForm = () => {
    setHeading1("");
    setHeading2("");
    setDescription("");
    setPrice(1);
    setRating(1);
    setLocation("");
    setDuration("");
    setKeywords([]);
    setwhatIncluded([]);
    setwhatNotIncluded([]);
    setImageUrl(null);
    setIsOpen(false);
  };

  const updateDB = async () => {
    try {
      setIsLoading(true);
      const data = {
        ...(imageUrl ? { imageUrl } : {}), // Include only if imageUrl is truthy
        heading1,
        tourId,
        heading2,
        description,
        price,
        rating,
        location,
        duration,
        whatIncluded,
        whatNotIncluded,
        keywords: keywords.join(", "),
      };
      const response = await axios.put("/api/update", data);
      toast.success("Update Success!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      resetForm();
      fetchTourPackages();
    } catch (error) {
      toast.error("Update Failed! Contact Nikhilesh Rana", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      console.error("Update error", error);
      setErrorMessage("Error updating tour package");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleReload();
  }, []);

  const chartData = tourPackages.map((tour) => ({
    name: tour.heading1,
    price: tour.price,
    rating: tour.rating,
  }));

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
      <div className="mx-auto p-4 space-y-8 min-h-screen">
        <header className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Indian Travel Tour</h1>
          <div className="flex flex-col-reverse gap-2 sm:flex-row">
            <Button onClick={handleReload} variant="outline" className="flex items-center gap-2">
              {isLoading ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={40}
                    height={40}
                    viewBox="0 0 24 24"
                  >
                    <title>Loading...</title>
                    <circle cx="4" cy="12" r="2" fill="currentColor">
                      <animate
                        id="ellipsis1"
                        begin="0;ellipsis3.end+0.25s"
                        attributeName="cy"
                        calcMode="spline"
                        dur="0.6s"
                        values="12;6;12"
                        keySplines=".33,.66,.66,1;.33,0,.66,.33"
                      />
                    </circle>
                    <circle cx="12" cy="12" r="2" fill="currentColor">
                      <animate
                        begin="ellipsis1.begin+0.1s"
                        attributeName="cy"
                        calcMode="spline"
                        dur="0.6s"
                        values="12;6;12"
                        keySplines=".33,.66,.66,1;.33,0,.66,.33"
                      />
                    </circle>
                    <circle cx="20" cy="12" r="2" fill="currentColor">
                      <animate
                        id="ellipsis3"
                        begin="ellipsis1.begin+0.2s"
                        attributeName="cy"
                        calcMode="spline"
                        dur="0.6s"
                        values="12;6;12"
                        keySplines=".33,.66,.66,1;.33,0,.66,.33"
                      />
                    </circle>
                  </svg>
                  Loading
                  </>
              ) : (
                <>
                <RefreshCw className="h-4 w-4" /> Reload
                </>
              )}
              
            </Button>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Upload className="mr-2 h-4 w-4" /> Upload Package
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:w-full">
                <DialogHeader>
                  <DialogTitle>Upload Tour Package</DialogTitle>
                </DialogHeader>
                <div className="grid gap-2 overflow-y-auto max-h-[80vh] px-2">
                  <div className="items-center">
                    <Label htmlFor="heading1" className="text-left">
                      Title (This will be Important for SEO h1)
                    </Label>
                    <Input
                      id="heading1"
                      value={heading1}
                      onChange={(e) => setHeading1(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <div className="items-center">
                    <Label htmlFor="heading2" className="text-left">
                      Subtitle (This will be Important for SEO h2)
                    </Label>
                    <Input
                      id="heading2"
                      value={heading2}
                      onChange={(e) => setHeading2(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <div>
                    <Label htmlFor="keywords" className="text-left">
                      Keywords (Very Important for SEO)
                    </Label>
                    <TagsInput
                      id="keywords"
                      value={keywords}
                      onValueChange={setKeywords}
                      placeholder="Press enter to add more keywords"
                      className="w-full"
                    />
                  </div>

                  <div className="flex gap-5 w-full">
                    <div className="w-full">
                      <Label htmlFor="whatIncluded" className="text-left">
                        What's Included
                      </Label>
                      <TagsInput
                        id="whatIncluded"
                        value={whatIncluded}
                        onValueChange={setwhatIncluded}
                        placeholder="Press enter to add more."
                        className="w-full"
                      />
                    </div>
                    <div className="w-full">
                      <Label htmlFor="whatNotIncluded" className="text-left">
                        What's Not Included
                      </Label>
                      <TagsInput
                        id="whatNotIncluded"
                        value={whatNotIncluded}
                        onValueChange={setwhatNotIncluded}
                        placeholder="Press enter to add more."
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="items-center">
                    <Label htmlFor="description" className="text-left">
                      Description (Should be SEO friendly and upto 70 Words Max)
                    </Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <div className="items-center">
                    <Label htmlFor="image" className="text-right">
                      Image
                    </Label>
                    <Input
                      id="image"
                      type="file"
                      onChange={handleFileUpload}
                      className="col-span-3"
                    />
                    {uploadProgress > 0 && uploadProgress < 100 && (
                      <Progress value={uploadProgress} className="w-full" />
                    )}
                    {imageUrl && (
                      <p className="text-sm text-green-600">
                        Image uploaded successfully!
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="items-center">
                      <Label htmlFor="price" className="text-left">
                        Price ($)
                      </Label>
                      <Input
                        id="price"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        className="col-span-3"
                      />
                    </div>
                    <div className="items-center">
                      <Label htmlFor="rating" className="text-left">
                        Rating (1-5)
                      </Label>
                      <Input
                        id="rating"
                        type="number"
                        min="1"
                        max="5"
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                        className="col-span-3"
                      />
                    </div>

                    <div className="items-center">
                      <Label htmlFor="location" className="text-left">
                        Location
                      </Label>
                      <Input
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="col-span-3"
                      />
                    </div>
                    <div className="items-center">
                      <Label htmlFor="duration" className="text-left">
                        Duration (Eg. 3 Days)
                      </Label>
                      <Input
                        id="duration"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <Button onClick={uploadDatatoMongoDb} disabled={isLoading}>
                    {isLoading ? (
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Upload className="mr-2 h-4 w-4" />
                    )}
                    Submit
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </header>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Packages
              </CardTitle>
              <Plane className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tourPackages.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Average Price
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                $
                {tourPackages.reduce((acc, tour) => acc + tour.price, 0) /
                  tourPackages.length || 0}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Average Rating
              </CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(
                  tourPackages.reduce((acc, tour) => acc + tour.rating, 0) /
                    tourPackages.length || 0
                ).toFixed(1)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Most Popular Location
              </CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {tourPackages.reduce((acc, tour) => {
                  acc[tour.location] = (acc[tour.location] || 0) + 1;
                  return acc;
                }, {} as Record<string, number>)[0] || "N/A"}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="chart" className="space-y-4">
          <TabsList className="w-full">
            <TabsTrigger className="w-full" value="chart">
              Chart
            </TabsTrigger>
            <TabsTrigger className="w-full" value="packages">
              Packages
            </TabsTrigger>
            <TabsTrigger className="w-full" value="bookings">
              Bookings
            </TabsTrigger>
            <TabsTrigger className="w-full" value="leads">
              Leads
            </TabsTrigger>
            <TabsTrigger className="w-full" value="settings">
              Settings
            </TabsTrigger>
          </TabsList>
          <TabsContent value="chart" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Price vs Rating Chart</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" orientation="left" stroke="#125427" />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      stroke="#09090B"
                    />
                    <Tooltip />
                    <Bar yAxisId="left" dataKey="price" fill="#125427" />
                    <Bar yAxisId="right" dataKey="rating" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="packages" className="space-y-4">
            {tourPackages.map((tour) => (
              <motion.div
                key={tour._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardContent className="flex items-center space-x-4 p-4">
                    {/* <Image
                      src={tour.imageURL || "https://placehold.co/300x200/png"}
                      alt={tour?.heading1 || "Tour Package Image"}
                      className="h-24 w-24 rounded-md object-cover"
                      height="200"
                      width="300"
                    /> */}
                    <div className="flex-1 space-y-1">
                      <h3 className="font-semibold">{tour.heading1}</h3>
                      <p className="text-sm text-muted-foreground">
                        {tour.heading2}
                      </p>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{tour.location}</span>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{tour.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span className="font-semibold">${tour.price}</span>
                        <Star className="h-4 w-4 text-yellow-400" />
                        <span>{tour.rating}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Star className="h-4 w-4 text-yellow-400" />
                        <span className="font-semibold">${tour.keywords}</span>
                      </div>
                    </div>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          onClick={() => {
                            setHeading1(tour.heading1);
                            setHeading2(tour.heading2);
                            setDescription(tour.description);
                            setPrice(tour.price);
                            setRating(tour.rating);
                            setLocation(tour.location);
                            setDuration(tour.duration);
                            setKeywords(tour.keywords.split(", ")); // Assuming keywords are stored as a comma-separated string
                            setwhatIncluded(tour.whatIncluded); // Assuming this is an array
                            setwhatNotIncluded(tour.whatNotIncluded); // Assuming this is an array
                            setTourId(tour._id);
                          }}
                        >
                          <ListRestart className="mr-2 h-4 w-4" /> Update
                          Package
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:w-full">
                        <DialogHeader>
                          <DialogTitle>Update Tour Package</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-2 overflow-y-auto max-h-[80vh] px-2">
                          <div className="items-center">
                            <Label htmlFor="heading1" className="text-left">
                              Title (This will be Important for SEO h1)
                            </Label>
                            <Input
                              id="heading1"
                              value={heading1}
                              onChange={(e) => setHeading1(e.target.value)}
                              className="col-span-3"
                            />
                          </div>
                          <div className="items-center">
                            <Label htmlFor="heading2" className="text-left">
                              Subtitle (This will be Important for SEO h2)
                            </Label>
                            <Input
                              id="heading2"
                              value={heading2}
                              onChange={(e) => setHeading2(e.target.value)}
                              className="col-span-3"
                            />
                          </div>
                          <div>
                            <Label htmlFor="keywords" className="text-left">
                              Keywords (Very Important for SEO)
                            </Label>
                            <TagsInput
                              id="keywords"
                              value={keywords}
                              onValueChange={setKeywords}
                              placeholder="Press enter to add more keywords"
                              className="w-full"
                            />
                          </div>

                          <div className="flex gap-5 w-full">
                            <div className="w-full">
                              <Label
                                htmlFor="whatIncluded"
                                className="text-left"
                              >
                                What's Included
                              </Label>
                              <TagsInput
                                id="whatIncluded"
                                value={whatIncluded}
                                onValueChange={setwhatIncluded}
                                placeholder="Press enter to add more."
                                className="w-full"
                              />
                            </div>
                            <div className="w-full">
                              <Label
                                htmlFor="whatNotIncluded"
                                className="text-left"
                              >
                                What's Not Included
                              </Label>
                              <TagsInput
                                id="whatNotIncluded"
                                value={whatNotIncluded}
                                onValueChange={setwhatNotIncluded}
                                placeholder="Press enter to add more."
                                className="w-full"
                              />
                            </div>
                          </div>

                          <div className="items-center">
                            <Label htmlFor="description" className="text-left">
                              Description (Should be SEO friendly and upto 70
                              Words Max)
                            </Label>
                            <Textarea
                              id="description"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              className="col-span-3"
                            />
                          </div>
                          <div className="items-center">
                            <Label htmlFor="image" className="text-right">
                              Image
                            </Label>
                            <Input
                              id="image"
                              type="file"
                              onChange={handleFileUpload}
                              className="col-span-3"
                            />
                            {uploadProgress > 0 && uploadProgress < 100 && (
                              <Progress
                                value={uploadProgress}
                                className="w-full"
                              />
                            )}
                            {imageUrl && (
                              <p className="text-sm text-green-600">
                                Image uploaded successfully!
                              </p>
                            )}
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div className="items-center">
                              <Label htmlFor="price" className="text-left">
                                Price ($)
                              </Label>
                              <Input
                                id="price"
                                type="number"
                                value={price}
                                onChange={(e) =>
                                  setPrice(Number(e.target.value))
                                }
                                className="col-span-3"
                              />
                            </div>
                            <div className="items-center">
                              <Label htmlFor="rating" className="text-left">
                                Rating (1-5)
                              </Label>
                              <Input
                                id="rating"
                                type="number"
                                min="1"
                                max="5"
                                value={rating}
                                onChange={(e) =>
                                  setRating(Number(e.target.value))
                                }
                                className="col-span-3"
                              />
                            </div>

                            <div className="items-center">
                              <Label htmlFor="location" className="text-left">
                                Location
                              </Label>
                              <Input
                                id="location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="col-span-3"
                              />
                            </div>
                            <div className="items-center">
                              <Label htmlFor="duration" className="text-left">
                                Duration (Eg. 3 Days)
                              </Label>
                              <Input
                                id="duration"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                className="col-span-3"
                              />
                            </div>
                          </div>
                        </div>
                        <DialogFooter className="sm:justify-start">
                          <DialogClose asChild>
                            <Button onClick={updateDB} disabled={isLoading}>
                              {isLoading ? (
                                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                              ) : (
                                <Upload className="mr-2 h-4 w-4" />
                              )}
                              Update
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => {
                        deleteTourPackage(tour._id);
                        deleteImage(tour.imageURL);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </TabsContent>
          <TabsContent value="bookings" className="space-y-4">
    <Card>
      <CardHeader>
        <CardTitle>Bookings</CardTitle>
      </CardHeader>
      <CardContent>
        {bookings.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tour Package</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>Adults</TableHead>
                  <TableHead>Children</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead>Price ($)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.slice().reverse().map((booking) => (
                  <TableRow key={booking._id}>
                    <TableCell>{booking.tourPackageBooked}</TableCell>
                    <TableCell>{booking.name}</TableCell>
                    <TableCell>{booking.email}</TableCell>
                    <TableCell>{booking.phone}</TableCell>
                    <TableCell>{new Date(booking.startDate).toLocaleDateString()}</TableCell>
                    <TableCell>{booking.adults}</TableCell>
                    <TableCell>{booking.children}</TableCell>
                    <TableCell>{booking.paymentMethod}</TableCell>
                    <TableCell>{booking.tourPackagePrice}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <p>No bookings found.</p>
        )}
      </CardContent>
    </Card>
       </TabsContent>

       <TabsContent value="leads" className="space-y-4">
  <Card>
    <CardHeader>
      <CardTitle>Leads</CardTitle>
    </CardHeader>
    <CardContent>
      {leads.length > 0 ? (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Message</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.slice().reverse().map((leads) => (
                <TableRow key={leads._id}>
                  <TableCell>{leads.email}</TableCell>
                  <TableCell>{leads.phone}</TableCell>
                  <TableCell>
                    {leads.createdAt
                      ? new Date(leads.createdAt).toLocaleString()
                      : ""}
                  </TableCell>
                  <TableCell>{leads.country}</TableCell>
                  <TableCell>{leads.message}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <p>No Leads found.</p>
      )}
    </CardContent>
  </Card>
</TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>About Indian Travel Tour</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Indian Travel Tour is developed by{" "}
                  <strong>Nikhilesh Rana</strong> (AI Software Engineer),
                  integrating cutting-edge AI technology to provide seamless
                  travel experiences, personalized AI itineraries, and
                  lighthouse based expert-guided tours across India.
                </p>
                <p className="mt-2">
                  Connect with me on{" "}
                  <Link
                    href="https://www.linkedin.com/in/nikhileshrana/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline hover:text-blue-800"
                  >
                    LinkedIn
                  </Link>
                  .
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
        </Tabs>

        {errorMessage && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline"> {errorMessage}</span>
          </div>
        )}
      </div>
    </>
  );
}
