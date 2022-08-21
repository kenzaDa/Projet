<?php

namespace App\Services;

use App\Entity\Cooptation;
use App\Entity\User;
use Symfony\Component\HttpFoundation\Request;
use App\Service\MessageGenerator;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\CooptationRepository;
use App\Repository\CooptedEntityRepository;
use App\Repository\StatusRepository;
use DateTime;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Mime\Email;
use Symfony\Component\Mailer\MailerInterface;
use App\Repository\UserRepository;
use App\Repository\PoleRepository;

class CooptationService
{
    protected $entityManager;
    protected $cooptationRepo;
    private $security;
    protected $serializer;
    protected $request;
    protected $statusRepository;
    protected $cooptedEntityRepository;
    protected $mailer;
    protected $userRepo;
    protected $poleRepo;
   public function __construct(EntityManagerInterface $entityManager,CooptationRepository $cooptationRepo, Security $security,SerializerInterface $serializer,
                                StatusRepository $statusRepository,CooptedEntityRepository $cooptedEntityRepository, MailerInterface $mailer, UserRepository $userRepo, PoleRepository $poleRepo )
   {
      $this->entityManager = $entityManager;
      $this->cooptationRepo = $cooptationRepo;
      $this->security = $security;
      $this->serializer = $serializer;
      $this->statusRepository = $statusRepository;
      $this->cooptedEntityRepository = $cooptedEntityRepository;
      $this->mailer=$mailer;
      $this->userRepo=$userRepo;
       $this->poleRepo=$poleRepo;
   }

   public function getCooptation($page)
    {
        return $this->cooptationRepo->findByPage($page);
    }
    public function getAllCooptation()
    {
        return $this->cooptationRepo->findAll();
    }

   public function getUserCooptation()
    {
        $user = $this->security->getUser();
        $userId = $user->getId(); 
        return $this->cooptationRepo->findBy(['user' => $userId]);
    }

   public function getUserCooptationById($id)
    {
        return $this->cooptationRepo->findBy(['id' => $id]);
    }
    
    // public function editCooptation(Request $request, $id=null)
    // {
    //         $content = $this->serializer->deserialize($request->getContent(),Cooptation::class,'json');
    //         $cooptation = $this->cooptationRepo->find($id);
    //         $cooptation->setFirstname($content->getFirstname());
    //         $cooptation->setLastname($content->getLastname());
    //         $cooptation->setCv($content->getCv());
    //         $cooptation->setCivility($content->getCivility());
    //         $cooptation->setPhone($content->getPhone());
    //         $cooptation->setLink($content->getLink());
    //         $cooptation->setEmail($content->getEmail()); 
    //         $cooptation->setProfessionalExperience($content->getProfessionalExperience());
    //         $cooptation->setApplicationDate($content->getApplicationDate());
    //         $cooptation->setCurrentPosition($content->getCurrentPosition());
    //         $cooptation->setFirstExperienceDate($content->getFirstExperienceDate());
    //         $cooptation->setFieldsActivity($content->getFieldsActivity());
    //         $cooptation->setCurrentSalary($content->getCurrentSalary());
    //         $cooptation->setKeyFigures($content->getKeyFigures());
    //         $cooptation->setInterviewDate($content->getInterviewDate());
    //         $cooptation->setInterviewType($content->getInterviewType());
    //         $cooptation->setGeographicalWishes($content->getGeographicalWishes());
    //         $cooptation->setComments($content->getComments());
    //         $cooptation->setPersonality($content->getPersonality());
    //         $cooptation->setSkils($content->getSkils());
    //         $cooptation->setExperience($content->getExperience());
    //         $cooptation->setDesiredSalary($content->getDesiredSalary());
    //         $cooptation->setSalary($content->getSalary());
    //         $cooptation->setPole($content->getPole());
    //         $this->entityManager->persist($cooptation);
    //         $this->entityManager->flush();
    //   return new JsonResponse($cooptation,200);
    // }

    public function deleteCooptation($id)
    {
    $cooptation = $this->cooptationRepo->find($id);
    if(!$cooptation){
    return new JsonResponse("cooptation not found");
    }
    $this->entityManager->remove($cooptation);
    $this->entityManager->flush($cooptation);
    return new JsonResponse("deleted");
}




public function saveCooptation(Request $request,UploaderService $uploaderService,$uploadedFile,$connectedUser)
{
    $firstName = $request->get('lastname');
    $lastName = $request->get('username');
    $civility = $request->get('civility');
    $phone = $request->get('phone');
    $link = $request->get('link');
    $email = $request->get('email');
    $application_date = $request->get('applicationDate');
    $professional_experience = $request->get('professionalExperience');
    $current_position = $request->get('currentPosition');
    $first_experience_date = $request->get('firstExperienceDate');
    $fields_activity = $request->get('fildesofactivity');
    $current_salary = $request->get('currentsalary');
    $interview_date = $request->get('interview_date');
    $interview_type = $request->get('interview_type');
    $geographical_wishes = $request->get('geographicalWishes');
    $comments = $request->get('comments');
    $personality = $request->get('character');
    $skils = $request->get('skills');
    $experience = $request->get('experience');
    $desired_salary = $request->get('desiredsalary');
    $salary = $request->get('currentsalary');
    $entity = $this->cooptedEntityRepository->find(1);
    $draft = $this->statusRepository->find(1);

    $newCooptation = new Cooptation();
    $newCooptation->setFirstname($firstName)
                    ->setLastname($lastName)
                    ->setCivility($civility)
                    ->setCv($uploaderService->getUploadedFileName($uploadedFile))
                    ->setPhone($phone)
                    ->setLink($link)
                    ->setEmail($email)
                    ->setApplicationDate(new DateTime(strtotime($application_date)))
                    ->setProfessionalExperience($professional_experience)
                    ->setCurrentPosition($current_position)
                    ->setFirstExperienceDate(new DateTime(strtotime($first_experience_date)))
                    ->setFieldsActivity($fields_activity)
                    ->setCurrentSalary($current_salary)
                    ->setKeyFigures(true)
                    ->setInterviewDate(new DateTime(strtotime($interview_date)))
                    ->setInterviewType([$interview_type])
                    ->setGeographicalWishes([$geographical_wishes])
                    ->setComments($comments)
                    ->setPersonality($personality)
                    ->setSkils($skils)
                    ->setExperience($experience)
                    ->setDesiredSalary([$desired_salary])
                    ->setSalary((int)$salary)
                    ->setStatus($draft)
                    ->setUser($connectedUser)
                    ->setCooptedEntity($entity);

    $this->entityManager->persist($newCooptation);
    $this->entityManager->flush();   
    $uploaderService->uploadCv($uploadedFile,$newCooptation->getCv());
}

   public function sendEmail(){
                    $email = (new Email())
                        ->from('admin@admin.com')
                        ->to('manager@admin.com')
                        ->subject('Bonjour')
                        ->text('Bonjour, vous avez une nouvelle demande de cooptation à consulter. Cordialement ')
                        ->html('<p>Bonjour, </p> <br> <p>vous avez une nouvelle demande de cooptation à consulter.</p> <br> <p>Cordialement </p> '); 
                        $this->mailer->send($email); 
                    }

    public function editCooptation(Request $request,SerializerInterface $serializer,UploaderService $uploaderService,$uploadedFile,$connectedUser,$id=null){
        $content = $serializer->deserialize($request->getContent(),Cooptation::class,'json');
        
            $cooptation = $this->cooptationRepo->find($id);
            if(!$cooptation){
                return new JsonResponse("cooptation not found",404);
            }

            $cooptation->setFirstname($content->getFirstname())
                            ->setLastname($content->getLastName())
                            ->setCivility($content->getCivility())
                            ->setCv($content->getCv())
                            ->setPhone($content->getPhone())
                            ->setLink($content->getLink())
                            ->setEmail($content->getEmail())
                            ->setApplicationDate(($content->getApplicationDate()))
                            ->setProfessionalExperience($content->getProfessionalExperience())
                            ->setCurrentPosition($content->getCurrentPosition())
                            ->setFirstExperienceDate($content->getFirstExperienceDate())
                            ->setFieldsActivity($content->getFieldsActivity())
                            ->setCurrentSalary($content->getCurrentSalary())
                            ->setKeyFigures(true)
                            ->setInterviewDate($content->getInterviewDate())
                            ->setInterviewType($content->getInterviewType())
                            ->setGeographicalWishes($content->getGeographicalWishes())
                            ->setComments($content->getComments())
                            ->setPersonality($content->getPersonality())
                            ->setSkils($content->getSkils())
                            ->setExperience($content->getExperience())
                            ->setDesiredSalary($content->getdesiredSalary())
                            ->setSalary((int)$content->getSalary())
                            ->setStatus($content->getStatus())
                            ->setUser($connectedUser)
                            ->setCooptedEntity($content->getCooptedEntity());
        
            $this->entityManager->flush();
            return new JsonResponse("cooptation modified with success");
           
        
    }
  
    }
      