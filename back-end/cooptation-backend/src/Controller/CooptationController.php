<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use FOS\RestBundle\Controller\Annotations as Rest;
use App\Entity\Cooptation;
use App\Repository\CooptationRepository;
use App\Repository\CooptedEntityRepository;
use App\Repository\StatusRepository;
use App\Repository\UserRepository;
use Symfony\Component\Security\Core\Security;
use App\Services\CooptationService;
use App\Services\UploaderService;
use DateTime;
use FOS\RestBundle\Request\ParamFetcher;
use Symfony\Component\Validator\Constraints\Date;
use Symfony\Component\Serializer\SerializerInterface;

 /**
   * @Rest\Route("/api/cooptation", name="cooptations")
   */
class CooptationController extends AbstractController
{
    public $cooptationService;
   public function __construct(CooptationService $cooptationService)
   {
      $this->cooptationService = $cooptationService; 
   }
  /**
   * @Rest\Get("/")
   * @Rest\View(serializerGroups={"cooptations"})
   */
   public function getallCooptations()
   {
      return $this->cooptationService->getAllCooptation();
   }
   //  /**
   // * @Rest\Get("/{page}")
   // * @Rest\View(serializerGroups={"cooptations"})
   // */
   // public function allCooptations($page)
   // {
   //   return $this->cooptationService->getCooptation($page);
   // }


   
   /**
   * @Rest\Get("/user")
   * @Rest\View(serializerGroups={"cooptations"})
   */
   public function userCooptation()
   {
     return $this->cooptationService->getUserCooptation();
   }

   /**
   * @Rest\Get("/{id}")
   * @Rest\View(serializerGroups={"cooptations"})
   */
   public function userCooptationById($id)
   {
      return $this->cooptationService->getUserCooptationById($id);
   }

  
   /**
   * @Rest\Put("/{id}")
   */
   public function editCooptationCollab( Request $request,SerializerInterface $serializer, UploaderService $uploaderService,CooptationService $cooptationService, $id){
      $cv = "cv";
     return $cooptationService->editCooptation( $request,$serializer,$uploaderService, $cv,$this->getUser(), $id);
      
   }
   
  /**
   * @Rest\Delete("/{id}")
   */
   public function deleteCooptation(CooptationService $cooptationService,$id)

   {
      return $cooptationService->deleteCooptation($id);
   }

   /**
    * @Rest\FileParam(name="cv",description="cv du coopté")
    * @Rest\Post("")
    */
    public function saveCooptation(ParamFetcher $paramFetcher,UploaderService $uploaderService,Request $request,CooptationService $cooptationService)
   {
      $cv = $paramFetcher->get('cv');
      $cooptationService->saveCooptation($request,$uploaderService, $cv,$this->getUser());
      return $this->json(["message" => "cooptation added succesfully"],200);
   }

}